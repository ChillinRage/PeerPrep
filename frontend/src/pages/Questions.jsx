import Navbar from "../components/Navbar";
import QuestionTable from '../components/QuestionTable'
import '../styles/questions.css';

const Questions = () => {
    return (
        <div>
        <Navbar />
        <h1>Questions</h1>
        <p className="description">View all the questions stored in database.</p>
        <QuestionTable />
        </div>
    );
}

export default Questions;