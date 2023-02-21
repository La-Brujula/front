export const ErrorMessage = ({ message }) => {
    return <div className="bg-amber-300 p-8 rounded-md text-[#303030] font-bold w-full max-w-[100vw]">
        <p className="w-full whitespace-pre-line truncate">{message}</p>
    </div>
}