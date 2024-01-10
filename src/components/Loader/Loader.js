const Loader = ({styles}) => {
    return (
        <div className="flex items-center justify-center">
            <div className={`${styles} border-solid rounded-full animate-spin`}></div>
        </div>
    )
}

export default Loader;