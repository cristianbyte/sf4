export const API_URL = "http://localhost:3000/api";

const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

function createCacheKey(endpoint, method, body) {
  const bodyStr = body ? JSON.stringify(body) : '';
  return `${method}:${endpoint}:${bodyStr}`;
}

function isCacheExpired(timestamp) {
  return Date.now() - timestamp > CACHE_DURATION;
}

function getFromCache(cacheKey) {
  const cacheEntry = cache.get(cacheKey);
  
  if (!cacheEntry) {
    return null;
  }
  
  if (isCacheExpired(cacheEntry.timestamp)) {
    cache.delete(cacheKey);
    return null;
  }
  
  return cacheEntry.data;
}

function setCache(cacheKey, data) {
  cache.set(cacheKey, {
    data,
    timestamp: Date.now()
  });
}

export async function apiRequest(endpoint, method = 'GET', body = null) {
  const shouldCache = method === 'GET';
  const cacheKey = shouldCache ? createCacheKey(endpoint, method, body) : null;
  
  if (shouldCache) {
    const cachedData = getFromCache(cacheKey);
    if (cachedData) {
      console.log(`Cache hit for: ${endpoint}`);
      return cachedData;
    }
  }
  
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  if (body && method !== 'GET' && method !== 'HEAD') {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw { response: { data: errorData } };
    }

    const data = await response.json();
    
    if (shouldCache && cacheKey) {
      setCache(cacheKey, data);
    }
    
    return data;
    
  } catch (error) {
    // If it's a network error and we have cached data, return it as fallback
    if (shouldCache && cacheKey) {
      const staleData = cache.get(cacheKey);
      if (staleData) {
        console.log(`Using stale cache for: ${endpoint} due to network error`);
        return staleData.data;
      }
    }
    
    throw error;
  }
}

export function clearCache(endpoint = null) {
  if (endpoint) {
    // Clear cache for specific endpoint
    const keysToDelete = [];
    for (const key of cache.keys()) {
      if (key.includes(endpoint)) {
        keysToDelete.push(key);
      }
    }
    keysToDelete.forEach(key => cache.delete(key));
    console.log(`Cleared cache for endpoint: ${endpoint}`);
  } else {
    // Clear all cache
    cache.clear();
    console.log('Cleared all cache');
  }
}

export function cleanExpiredCache() {
  const keysToDelete = [];
  
  for (const [key, entry] of cache.entries()) {
    if (isCacheExpired(entry.timestamp)) {
      keysToDelete.push(key);
    }
  }
  
  keysToDelete.forEach(key => cache.delete(key));
  
  if (keysToDelete.length > 0) {
    console.log(`Cleaned ${keysToDelete.length} expired cache entries`);
  }
  
  return keysToDelete.length;
}

if (typeof window !== 'undefined') {
  setInterval(cleanExpiredCache, 10 * 60 * 1000);
}