import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import registerSchema from '../../schema/registerSchema'
import loginSchema from '../../schema/loginSchema'
import * as yup from 'yup';
import Button from "../common/Button";
import SF4 from "../../assets/images/SF4-logo.webp"
import './authModal.css'

const AuthModal = ({ isOpen, setIsOpen, onClose }) => {

    const currentSchema = isOpen === "login" ? loginSchema : registerSchema;
    
    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        reset 
    } = useForm({
        resolver: yupResolver(currentSchema)
    });

    const onSubmit = (data) => {
        console.log('Datos válidos:', data);
        
        if (isOpen === "login") {
            // Lógica de login
            console.log('Intentando login con:', data);
        } else {
            // Lógica de registro
            console.log('Intentando registro con:', data);
        }
    };

    // Cambiar entre login/register y resetear errores
    const switchMode = (mode) => {
        setIsOpen(mode);
        reset(); // Limpia errores y valores del form anterior
    };

    return createPortal(
       <div className="auth-container" onClick={() => onClose()}>
            <div className="auth" onClick={(e) => e.stopPropagation()}>
                <div className="auth-header">
                    <Button 
                        variant='cancel' 
                        children={"X"} 
                        onClick={() => onClose()} 
                        className='authCloseWindow-btn' 
                    />
                    <img src={SF4} className="auth-header-img" alt="street fighters 4 logo" />
                </div>
                
                <div className="auth-form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="auth-buttons">
                            <Button 
                                children={"ACCEDER"} 
                                className={isOpen === "login" ? 'active' : ''} 
                                size='sizeM' 
                                onClick={() => switchMode("login")} 
                                type="button"
                            />
                            <Button 
                                children={"REGISTRARME"} 
                                className={isOpen === "enroll" ? 'active' : ''} 
                                size='sizeM' 
                                onClick={() => switchMode("enroll")} 
                                type="button"
                            />
                        </div>

                        {/* Email (común para ambos) */}
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                {...register('email')}
                                type="email" 
                                id="email"
                                className={errors.email ? 'error-input' : ''}
                            />
                            {errors.email && <span className="error-message">{errors.email.message}</span>}
                        </div>

                        {/* Username (solo en registro) */}
                        {isOpen === "enroll" && (
                            <div className="input-group">
                                <label htmlFor="username">Username</label>
                                <input 
                                    {...register('username')}
                                    type="text" 
                                    id="username"
                                    className={errors.username ? 'error-input' : ''}
                                />
                                {errors.username && <span className="error-message">{errors.username.message}</span>}
                            </div>
                        )}

                        {/* Password */}
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                {...register('password')}
                                type="password" 
                                id="password"
                                className={errors.password ? 'error-input' : ''}
                            />
                            {errors.password && <span className="error-message">{errors.password.message}</span>}
                        </div>

                        <button type="submit" className="submit-btn">
                            {isOpen === "login" ? "Entrar" : "Registrarme"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
        , document.body)
}

export default AuthModal;