import { useNavigate } from "react-router-dom";

function Main() {
    const navigate = useNavigate();
    const goToPersonShowComp = () => {
        // This will navigate to second component
        navigate('/person-show')
    }
    const goToPersonAddComp = () => {

        // This will navigate to first component
        navigate('/person-add');
    };

    return (
        <div className="App">
            <header className="App-header">
                <p>Main components</p>
                <button onClick={goToPersonShowComp}>Go To Show Person </button>
                <button onClick={goToPersonAddComp}>Go To Add Person </button>
            </header>
        </div>
    );

}
export default Main;