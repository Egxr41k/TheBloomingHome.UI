const Spinner = () => {
	return (
		<div className="flex h-[90vh] items-center justify-center">
			<div className="relative">
				<div className="h-20 w-20 rounded-full border-2 border-fuchsia-300"></div>
				<div className="absolute left-0 top-0 h-20 w-20 animate-spin rounded-full border-t-2 border-fuchsia-500"></div>
			</div>
		</div>
	)
}

export default Spinner
