import EventForm from "../../components/EventForm";

const AddEventPage = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add Event</h1>
            <EventForm />
        </div>
    );
}

export default AddEventPage;