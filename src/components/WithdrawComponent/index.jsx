import React, { useState, useEffect } from "react";
import "./styles.css";

const paymentMethods = [
    { id: 1, name: 'Карта', imgUrl: '/payment/sbp.png' },
    { id: 2, name: 'PayPal', imgUrl: '/payment/paypal.png' },
    { id: 3, name: 'Google Pay', imgUrl: '/payment/gpay.png' },
    { id: 4, name: 'Apple Pay', imgUrl: '/payment/applepay.png' },
];

const WithdrawComponent = () => {
    const [step, setStep] = useState(1);
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [cardNumber, setCardNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");
    const [popupState, setPopupState] = useState(null);
    const [savedCard] = useState(localStorage.getItem("savedCard") || "");

    useEffect(() => {
        if (savedCard) {
            setCardNumber(savedCard);
        }
    }, []);

    const handleNextStep = () => {
        if (step === 1 && selectedMethod) {
            setStep(2);
        } else if (step === 2) {
            if (cardNumber.replace(/\s/g, "").length < 16) {
                setError("Недостаточно цифр в номере карты");
                setPopupState("invalidNumber");
            } else if (!validateCard(cardNumber.replace(/\s/g, ""))) {
                setError("Карта не найдена");
                setPopupState("cardNotFound");
            } else {
                setError("");
                setPopupState(null);
                localStorage.setItem("savedCard", cardNumber);
                setStep(3);
            }
        } else if (step === 3) {
            if (!validateAmount(amount)) {
                setError("Введите сумму от 10₽ до 249 999₽");
            } else {
                setError("");
                setStep(4);
            }
        }
    };

    const handlePreviousStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleSelectMethod = (id) => {
        setSelectedMethod(id);
        setError("");
    };

    const handleCardNumberChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");

        value = value.replace(/(.{4})/g, "$1 ").trim();

        setCardNumber(value);

        if (value === "") {
            setError("");
            setPopupState(null);
        }
    };

    const handleAmountChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        setAmount(value);

        if (value === "") {
            setError("");
        }
    };

    const validateCard = (number) => {
        const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
        const masterCardRegex = /^5[1-5][0-9]{14}$/;
        return visaRegex.test(number) || masterCardRegex.test(number);
    };

    const validateAmount = (value) => {
        const num = Number(value);
        return num >= 10 && num <= 249999;
    };

    const getCardTypeImage = () => {
        if (/^4/.test(cardNumber.replace(/\s/g, ""))) {
            return "/payment/visa.png";
        } else if (/^5[1-5]/.test(cardNumber.replace(/\s/g, ""))) {
            return "/payment/mastercard.png";
        }
        return null;
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setPopupState(null);
        }
    };

    return (
        <div className="withdraw-container">
            {step === 4 && (
                <div className="congratulations-text">
                    <img src="/thumbs-up.png" alt="Thumbs up" />
                    <h2>Поздравляем!</h2>
                    <p>Ваша заявка на вывод успешно создана, статус можно посмотреть во вкладе выше - история.</p>
                </div>
            )}

            {step < 4 && (
                <h2 className="withdraw-title">Выберите способ для вывода средств</h2>
            )}

            <div className="progress-bar">
                {[1, 2, 3, 4].map((index) => (
                    <div
                        key={index}
                        className={`progress-step ${index <= step ? "active" : ""}`}
                    />
                ))}
            </div>

            {step === 1 && (
                <div className="payment-container">
                    {paymentMethods.map((method) => (
                        <div
                            key={method.id}
                            className={`payment-method ${selectedMethod === method.id ? "selected" : ""}`}
                            onClick={() => handleSelectMethod(method.id)}
                        >
                            <div className="saved-card-block">
                                <img
                                    src={selectedMethod === method.id ? "/icons/checked.svg" : "/icons/unchecked.svg"}
                                    alt={selectedMethod === method.id ? "Выбрано" : "Не выбрано"}
                                />
                                {savedCard && selectedMethod === method.id && (
                                    <span className="saved-card-text">Прошлые реквизиты</span>
                                )}
                            </div>
                            <img src={method.imgUrl} alt={method.name} />
                        </div>
                    ))}
                </div>
            )}

            {step === 2 && (
                <div className="card-input-container">
                    <input
                        type="text"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="Введите номер карты"
                        maxLength="19"
                        className={`card-input ${error ? "input-error" : ""}`}
                    />
                    {getCardTypeImage() && (
                        <img src={getCardTypeImage()} alt="Card Type" className="card-type-icon" />
                    )}
                </div>
            )}

            {step === 3 && (
                <div className="card-input-container">
                    <input
                        type="text"
                        value={amount}
                        onChange={handleAmountChange}
                        placeholder="Сумма от 10₽ до 249 999₽"
                        className={`card-input ${error ? "input-error" : ""}`}
                    />
                    <span className="commission-text">
                        Текст про комиссию или другие особенности
                    </span>
                </div>
            )}

            {step < 4 && (
                <button
                    className={`link-card-more-button ${selectedMethod ? "active" : ""}`}
                    onClick={handleNextStep}
                    disabled={step === 1 && !selectedMethod}
                >
                    {step === 3 ? "Отправить заявку на вывод" : "Продолжить"}
                </button>
            )}

            <button
                className={`withdraw-back-button ${step === 1 ? "disabled" : ""}`}
                onClick={handlePreviousStep}
                disabled={step === 1}
            >
                Назад
            </button>
            {popupState && (
                <div className="block-popup-overlay" onClick={handleOverlayClick}>
                    <div className="payment-popup-content">
                        {popupState === "invalidNumber" ? (
                            <>
                                <img src="/error-icon.png" alt="Popup" />
                                <p>Неверные реквизиты</p>
                            </>
                        ) : (
                            <>
                                <img src="/cancel-icon.png" alt="Popup" />
                                <p>Любой другой текст ошибки</p>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WithdrawComponent;
