import Navbar from "../components/Navbar";
import QuestionTable from '../components/question-table'
import '../styles/Problems.css';

const Problems = () => {
    return (
        <div>
        <Navbar />
        <h1>Problems</h1>
        <p className="description">View all the questions stored in database.</p>
        <QuestionTable />
        </div>
    );
}

export default Problems;