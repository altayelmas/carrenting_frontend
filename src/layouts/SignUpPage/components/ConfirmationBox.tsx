import {ReactElement} from "react";

export const ConfirmationBox = ({show}: {show:boolean}): ReactElement => {
    if (!show) {
        return <></>;
    }
    return (
        <div className="overlay">
            <div className="dialog">
                <div className="dialog__content">
                    <h2 className="dialog__title">Successfully registered.</h2>
                    <p className="dialog__description">
                        Sign up successful. Please log in to continue.
                    </p>
                </div>
                <hr/>
                <div className="dialog__footer">
                    <button className="btn main-color btn-sml text-white" onClick={() => {
                        show = false;
                    }}>OK</button>
                </div>
            </div>
        </div>
    );
}
export default ConfirmationBox;
