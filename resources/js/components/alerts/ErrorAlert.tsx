type AlertProps = {
    message: string;
    onClose?: () => void;
};

export default function ErrorAlert({ message, onClose }: AlertProps) {
    return (
        <div className="mb-4 flex cursor-pointer items-center justify-between rounded-md bg-red-100 p-4 text-red-800" onClick={onClose}>
            <span>{message}</span>
            <button className="ml-4 font-bold" onClick={onClose}>
                &times;
            </button>
        </div>
    );
}
