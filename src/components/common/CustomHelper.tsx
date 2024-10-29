interface CustomHelperProps {
    height?: string;
    idAlert?: string;
    maxChars?: number;
    message?: string;
    align?: string;
    fullWidth?: boolean;
}

export const CustomHelper = ({
    height = 'fit',
    idAlert,
    maxChars = 60,
    message,
    align = "center",
    fullWidth = false,
}: CustomHelperProps) => {


    const truncatedMessage = maxChars ? message?.substring(0, maxChars) : message

    return (
        <section id={idAlert} className={`rounded h-[${height}] ${fullWidth ? 'w-full' : 'w-fit'} flex items-${align} mt-1 whitespace-normal border-0.5`}>
            <p className={`text-left text-xs leading-5 opacity-100 text-accent`}>
                {truncatedMessage}
            </p>
        </section>
    )
}