import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import registerSchema from '../../schema/registerSchema'
import loginSchema from '../../schema/loginSchema'
import Button from "../common/Button";
import { apiRequest } from '../../services/request';
import { useUser } from '../../context/userCotext';
import './authModal.css'

const AuthModal = ({ isOpen, setIsOpen, onClose }) => {
    const { setUser, setIsLoading } = useUser();
    const [serverResponse, setServerResponse] = useState('');

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
        setServerResponse('');
        setIsLoading(true);
        
        if (isOpen === "login") {
            apiRequest("/user/login", "POST", { ...data })
                .then(response => {
                    setUser(response);
                    reset();
                    onClose();
                })
                .catch(error => {
                    const errorData = error.response?.data;
                    if (errorData?.details && errorData.details.length > 0) {
                        setServerResponse(errorData.details[0].message );
                    } else {
                        setServerResponse(error.response?.data.message || 'Error desconocido');
                    }
                })
                .finally(() => setIsLoading(false));

        } else {
            apiRequest("/user", "POST", { ...data })
                .then(response => {
                    console.log("Register success:", response);
                    const message = response?.message || 'Registro exitoso';
                    reset();
                    setServerResponse(message);
                })
                .catch(error => {
                    const errorData = error.response?.data;
                    console.log(error);
                    if (errorData?.details && errorData.details.length > 0) {
                        setServerResponse(errorData.details[0].message );
                    } else {
                        setServerResponse(error.response?.data.message || 'Error desconocido');
                    }
                })
                .finally(() => setIsLoading(false));
        }
    };

    const switchMode = (mode) => {
        setIsOpen(mode);
        reset();
        setServerResponse('');
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
                            <label htmlFor="email" onClick={()=>setIsLoading(true)} >Email</label>
                            <input
                                {...register('email')}
                                id="email"
                                className={errors.email ? 'error-input' : ''}
                            />
                            {errors.email && <span className="error-message">{errors.email.message}</span>}
                        </div>

                        {isOpen === "enroll" && (
                            <div className="input-group">
                                <label htmlFor="name" >Nombre</label>
                                <input
                                    {...register('name')}
                                    type="text"
                                    autoComplete="off"
                                    id="name"
                                    className={errors.name ? 'error-input' : ''}
                                />
                                {errors.name && <span className="error-message">{errors.name.message}</span>}
                            </div>
                        )}

                        <div className="input-group">
                            <label htmlFor="password">Contraseña</label>
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

                    {serverResponse && (
                        <div className="server-response">
                            {serverResponse}
                        </div>
                    )}

                </form>
            </div>
        </div>
        , document.body)
}

export default AuthModal;