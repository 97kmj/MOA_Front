export function Checkbox({ children}){
    return(
        <label>
            <input type="checkbox" />
            {children}
        </label>
    )
}