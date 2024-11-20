export default function Button({children}) {
    return (
        <button className="bg-primary-900 border-1 border-primary-500 text-primary p-2 rounded-md hover:bg-primary-800 hover:border-primary-400">
            {children}
        </button>
    )
}