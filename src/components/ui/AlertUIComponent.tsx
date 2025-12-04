type AlertUIComponentType = {
    type: 'error' | 'success',
    msg: string,
}

function AlertUIComponent({ type, msg }: AlertUIComponentType) {
    const classesType = {
        error: 'bg-red-100 border-red-500 text-red-500',
        success: 'bg-green-100 border-green-500 text-green-500',
    }

    return (
        <p className={`p-2 mb-2 border-l-4 ${classesType[type]}`}>{msg}</p>
    )
}

export default AlertUIComponent