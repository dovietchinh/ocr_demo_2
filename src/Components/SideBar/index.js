import { useToasts } from "../Toast"

const SideBar = () => {
    const { add, remove } = useToasts()
    return (
        <div>
            <button onClick={e=>add('asdaskdhas','success')}>add</button>
            <button onClick={e=>add('asdaskdhas','warning')}>remove</button>
        </div>
    )
}

export default SideBar