import React, { useState, useEffect } from "react";
import { RiUserLine, RiLockLine, RiEyeOffLine, RiEyeLine, RiFacebookLine, RiGoogleLine } from 'react-icons/ri';
import '../../css/auth/login.css'; // Import your custom CSS
import Modal from "react-modal";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup"
import * as accountService from "../../services/AccountService";
import {useNavigate} from "react-router";

function Login() {
    const [loginModalIsOpen, setLoginModalIsOpen] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [error, setError] = useState('')
    const [account, setAccount] = useState({username:"", password:""});
    const navigate = useNavigate()

    const validateAccount = {
        username : Yup.string().required("Vui lòng điền tên đăng nhập.").min(2).max(1000),
        password : Yup.string().required("Vui lòng điền tên mật khẩu.").min(2).max(1000)
    }

    // HANDLE DISPLAY FORM
    useEffect(() => {
        // console.log(account);
        const handleModalOpen = () => {
            setLoginModalIsOpen(true);
            setTimeout(() => {
                const inputs = document.querySelectorAll(".form__input");
                if (inputs.length > 0) {
                    addEventListeners(inputs);
                }
            }, 100);
        };

        const addEventListeners = (inputs) => {
            const addFocus = (event) => {
                let parent = event.target.parentNode.parentNode;
                parent.classList.add("focus");
            };

            const removeFocus = (event) => {
                let parent = event.target.parentNode.parentNode;
                if (event.target.value === "") {
                    parent.classList.remove("focus");
                }
            };

            inputs.forEach(input => {
                input.addEventListener("focus", addFocus);
                input.addEventListener("blur", removeFocus);
            });

            return () => {
                inputs.forEach(input => {
                    input.removeEventListener("focus", addFocus);
                    input.removeEventListener("blur", removeFocus);
                });
            };
        };

        document.getElementById("open-login-modal").addEventListener("click", handleModalOpen);

        // return () => {
        //     document.getElementById("open-login-modal").removeEventListener("click", handleModalOpen);
        // };
    }, [loginModalIsOpen]);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const openLoginModal = () => {
        setLoginModalIsOpen(true);
    };


    // LOGIN
    const login = async (account) => {
        try {
            const userData = await accountService.login(account.username, account.password)
            console.log(userData)
            console.log(userData.access_token)
            if (userData.access_token) {
                localStorage.setItem('token', userData.access_token)
                localStorage.setItem('role', userData.role)
                navigate('/contract')
            }else{
                // setError(userData.message)
                setError(userData.message)
            }

        } catch (error) {
            console.log(error)
            // setError(error.message)
            setError("Đăng nhập thất bại.")
        }
    }

    return (
        <>
            <button id="open-login-modal" className="btn btn-danger" onClick={openLoginModal}>Đăng nhập</button>
            <Modal
                appElement={document.getElementById('root')}
                isOpen={loginModalIsOpen}
                onRequestClose={() => setLoginModalIsOpen(false)}
                className="modal-content"
            >
                <Formik initialValues={account}
                        onSubmit={login}
                        validationSchema={Yup.object(validateAccount)}>

                <div className="l-form">
                    <div className="shape1"/>
                    <div className="shape2"/>

                    <div className="form">
                        <Form action="" className="form__content">
                            <h1 className="form__title">Đăng nhập</h1>

                            <div className="form__div form__div-one">

                                {error && <div className="login__fail_message">{error}</div>}

                                <div className="form__icon">
                                    <RiUserLine />
                                </div>
                                <div className="form__div-input">
                                    <label htmlFor="" className="form__label">Tên đăng nhập</label>
                                    <Field type="text" className="form__input" name="username"/>
                                    <ErrorMessage className="error__message" name="username" component="div"/>
                                </div>
                            </div>

                            <div className="form__div">
                                <div className="form__icon">
                                    <RiLockLine />
                                </div>
                                <div className="form__div-input">
                                    <label htmlFor="" className="form__label">Mật khẩu</label>
                                    <Field type={passwordVisible ? "text" : "password"} className="form__input" id="password" name="password"/>
                                    <div className="form__icon login__eye" onClick={togglePasswordVisibility}>
                                        {passwordVisible ? <RiEyeLine /> : <RiEyeOffLine />}
                                    </div>
                                    <ErrorMessage className="error__message" name="password" component="div"/>
                                </div>
                            </div>

                            {/*<div className="form__check">*/}
                            {/*    <div className="form__remember">*/}
                            {/*        <label htmlFor="check">*/}
                            {/*            <input type="checkbox" id="check"/>*/}
                            {/*            Ghi nhớ tôi*/}
                            {/*        </label>*/}
                            {/*    </div>*/}
                            {/*    <a href="#" className="form__forgot">Quên mật khẩu?</a>*/}
                            {/*</div>*/}

                            <button type="submit" className="form__button">ĐĂNG NHẬP</button>

                            {/*<div className="form__social">*/}
                            {/*    <span className="form__social-text">Hoặc đăng nhập với</span>*/}
                            {/*    <a href="#" className="form__social-icon"><RiFacebookLine /></a>*/}
                            {/*    <a href="#" className="form__social-icon"><RiGoogleLine /></a>*/}
                            {/*</div>*/}
                        </Form>
                    </div>
                </div>

                </Formik>
            </Modal>
        </>
    );
}

export default Login;
