type AlertProps = {
    message: string;
    onClose?: () => void;
};

export default function SuccessAlert({ message, onClose }: AlertProps) {
    return (
        <div
            className="mb-4 flex cursor-pointer items-center justify-between rounded-md bg-green-100 p-4 text-green-800"
            onClick={onClose} // dismiss when clicked
        >
            <span>{message}</span>
            <button className="ml-4 font-bold" onClick={onClose}>
                &times;
            </button>
        </div>
    );
}
