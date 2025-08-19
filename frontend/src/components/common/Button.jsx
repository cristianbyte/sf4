import './button.css';

const Button = ({
    children,
    onClick,
    href,
    type = 'button',
    variant = 'primary',
    size = '',
    disabled = false,
    className = '',
    ...props
}) => {
    const buttonClass = [
        'btn',
        `btn--${variant}`,
        `btn--${size}`,
        disabled && 'btn--disabled',
        className
    ].filter(Boolean).join(' ');

    if (href) {
        return (
            <div className="btn__container">
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClass}
                    {...props}
                >
                    {children}
                </a>
            </div>

        );
    }

    return (
        <div className="btn__container">
            <button
                type={type}
                className={buttonClass}
                onClick={onClick}
                disabled={disabled}
                {...props}
            >
                {children}
            </button>
        </div>
    );
};

export default Button;