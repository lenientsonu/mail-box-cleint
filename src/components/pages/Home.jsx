import NewExpense from "../NewExpense/NewExpense";
import Expenses from "../Expenses/Expenses";

import Header from "../Layout/Header";

const Homepage = (props) => {
    return (
        <>
            <header>
                <Header />
            </header>
            <main>
                <NewExpense />
                <Expenses />
            </main>
        </>
    );
};

export default Homepage;
