export default function Container({ children }) {
    return (
        <div className="flex flex-col justify-between py-2.5 px-44">
            {children}
        </div>
    )   
}