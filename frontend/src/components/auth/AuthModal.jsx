import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import registerSchema from '../../schema/registerSchema'
import loginSchema from '../../schema/loginSchema'
import Button from "../common/Button";
import { apiRequest } from '../../services/post';
import { useUser } from '../../context/userCotext';
import './authModal.css'

const AuthModal = ({ isOpen, setIsOpen, onClose }) => {
    const { setUser } = useUser();
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

            apiRequest("/user/login", "POST", { ...data })
                .then(response => {
                    console.log("Login success:", response);
                    setUser(response);
                    reset();
                    onClose();
                })
                .catch(error => {
                    console.log("Login failed:", error);
                });

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
                <Button
                    variant='cancel'
                    children={"X"}
                    onClick={() => onClose()}
                    className='authCloseWindow-btn'
                />

                <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="auth-buttons">
                        <Button
                            children={"ACCEDER"}
                            className={isOpen === "login" ? 'active' : ''}
                            size='sizeMin'
                            onClick={() => switchMode("login")}
                            type="button"
                        />
                        <Button
                            children={"REGISTRARME"}
                            className={isOpen === "enroll" ? 'active' : ''}
                            size='sizeMin'
                            onClick={() => switchMode("enroll")}
                            type="button"
                        />
                    </div>

                    <div className="auth-inputs">
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                {...register('email')}
                                type="email"
                                id="email"
                                autoComplete="off"
                                className={errors.email ? 'error-input' : ''}
                            />
                            {errors.email && <span className="error-message">{errors.email.message}</span>}
                        </div>

                        {isOpen === "enroll" && (
                            <div className="input-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    {...register('username')}
                                    type="text"
                                    autoComplete="off"

                                    id="username"
                                    className={errors.username ? 'error-input' : ''}
                                />
                                {errors.username && <span className="error-message">{errors.username.message}</span>}
                            </div>
                        )}

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
                    </div>

                </form>
            </div>
        </div>
        , document.body)
}

export default AuthModal;