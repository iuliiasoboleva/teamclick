import React from "react";
import { formatNumber } from "../../helpers";
import "./styles.css";

const UserHeader = ({ user }) => {
    return (
        <div className="home-header">
            <div className="home-header-top">
                <div className="home-header-user-block">
                    <div className="home-header-image-block">
                        <img className="home-header-image" src={user.avatar} alt="Profile image" />
                        <p className="home-header-pro">PRO</p>
                    </div>
                    <div className="home-header-text">
                        <p className="user-name">{user.name}</p>
                        <p className="user-role">{user.role}</p>
                    </div>
                </div>
                <div className="home-header-label">
                    <img src="/icons/crown.svg" alt="Grade" />
                    <p>Ранг {user.rank}</p>
                </div>
            </div>
            <div className="home-header-table-info">
                <div className="table-column">
                    <img className="table-column-image" src="/icons/cardholder.svg" alt="Cardholder" />
                    <div>
                        <p className="table-label">Баланс</p>
                        <p className="table-value">{formatNumber(user.balance)} ₽</p>
                    </div>
                </div>
                <div className="table-divider"></div>
                <div className="table-column">
                    <img className="table-column-image" src="/icons/tokens.svg" alt="Tokens" />
                    <div>
                        <p className="table-label">Токены</p>
                        <p className="table-value">{formatNumber(user.tokens)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHeader;
