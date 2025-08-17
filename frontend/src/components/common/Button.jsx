import './button.css';

const Button = ({
    children,
    onClick,
    href,
    type = 'button',
    variant = 'primary',
    size = 'sizeM',
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
                <div className="corner-left"></div>
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClass}
                    {...props}
                >
                    {children}
                </a>
                <div className="corner-right"></div>
            </div>

        );
    }

    return (
        <div className="btn__container">
            <div className="corner-left"></div>
            <button
                type={type}
                className={buttonClass}
                onClick={onClick}
                disabled={disabled}
                {...props}
            >
                {children}
            </button>
            <div className="corner-right"></div>
        </div>
    );
};

export default Button;