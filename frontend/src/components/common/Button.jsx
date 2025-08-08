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
            <a
                href={href}
                className={buttonClass}
                {...props}
            >
                {children}
            </a>
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