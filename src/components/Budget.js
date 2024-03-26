
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, currency, spending, dispatch } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);
    // const [currency, setCurrency] = useState('£');
    
    const handleBudgetChange = (event) => {
        setNewBudget(event.target.value);
        saveBudget();
    };

    const handleCurrencyChange = (event) => {
        const newCurrency = event.target.value;

        dispatch({
            type: 'SET_CURRENCY',
            payload: newCurrency
        });
    };

    
    const saveBudget = () => {

        if (newBudget < spending) {
            alert("You cannot reduce the budget value lower than the spending");
            return;
        }

        if (newBudget > 20000) {
            alert("The budget cannot exceed 20,000");
            return;
        }
        dispatch({
            type: 'SET_BUDGET',
            payload: newBudget
        });
    };
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            saveBudget();
        }
    };
    return (
        <div className='alert alert-secondary'>
            <label className='currency-label'>Currency:</label>
            <select className='currency-dropdown' value={currency} onChange={handleCurrencyChange}>
                <option value="$">Dollar</option>
                <option value="£">Pound</option>
                <option value="€">Euro</option>
                <option value="₹">Rupee</option>
            </select>
            <span>Budget: {currency}{budget}</span>
            <div>{currency}
                <input
                    type="number"
                    step="10"
                    value={newBudget}
                    onChange={handleBudgetChange}
                    onKeyPress={handleKeyPress}
                />
            </div>
        </div>
    );
};
export default Budget;