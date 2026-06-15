import { useState, useEffect } from "react";

const Notify = ({ errorMessage }) => {
    const [visible, setVisible] = useState(Boolean(errorMessage));

    useEffect(() => {
        setVisible(Boolean(errorMessage));
    }, [errorMessage]);

    if (!errorMessage || !visible) return null;

    return (
        <div className="notify">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>{errorMessage}</div>
                <button className="btn secondary" onClick={() => setVisible(false)}>Dismiss</button>
            </div>
        </div>
    );
}

export default Notify