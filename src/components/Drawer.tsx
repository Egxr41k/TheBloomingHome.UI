import React, { useState } from 'react'
import CloseIcon from '../icons/close.svg'

interface IDrawerProps {
	position: 'left' | 'right'
	children: React.ReactNode
	btnIconSrc: string
}

const Drawer = ({ position, children, btnIconSrc }: IDrawerProps) => {
	const [isOpen, setIsOpen] = useState(false)

	const drawerPos = {
		right: 'fixed top-0 right-0',
		left: 'fixed top-0 left-0'
	}
	const closeBtnPos = {
		right: 'absolute top-6 left-6',
		left: 'absolute top-6 right-6'
	}

	const hider = {
		right: isOpen ? ' translate-x-0' : ' translate-x-full',
		left: isOpen ? '-translate-x-0' : '-translate-x-full'
	}

	return (
		<div className="z-10 flex">
			<button className="my-auto h-8 w-8" onClick={() => setIsOpen(true)}>
				<img src={btnIconSrc} alt="" />
			</button>
			<div
				className={[
					drawerPos[position],
					hider[position],
					'z-10 flex h-screen w-60 items-center justify-center bg-fuchsia-600 shadow-md duration-300'
				].join(' ')}
			>
				<button
					className={closeBtnPos[position]}
					onClick={() => setIsOpen(false)}
				>
					<img src={CloseIcon} className="h-8 w-8" alt="" />
				</button>
				{children}
			</div>
		</div>
	)
}

export default Drawer
