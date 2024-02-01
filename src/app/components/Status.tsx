import Chip from "./Chip";
import '../components/status.css';

const Status = () => {
    return (
        <div className="status p-10">
            <div className="badge badge-neutral">Offline</div>
            <div className="badge badge-secondary badge-outline">Online</div>
            <input
                type="checkbox"
                className="toggle [--tglbg:black] bg-orange-600 hover:bg-orange-700 border-orange-500 "
            />
            <input
                type="checkbox"
                className="toggle [--tglbg:#D45B13] bg-black hover:bg-orange-700 border-orange-500"
            />
            <Chip />
        </div>
    )
}
export default Status;