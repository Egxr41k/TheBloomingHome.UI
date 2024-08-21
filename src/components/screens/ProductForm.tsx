import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useProductInfo from '../../hooks/useProductInfo'
import NO_PHOTO_YET from '../../imgs/NO_PHOTO_YET.png'
import IFeature from '../../types/IFeature'
import IProperty from '../../types/IProperty'
import BorderedBtn from '../btns/BorderedBtn'
import FilledBtn from '../btns/FilledBtn'

const ProductForm = () => {
	const { id } = useParams()
	const intId = parseInt(id ?? '')
	const {
		productInfo,
		setProductValues,
		images,
		isImagesExist,
		setImageToPos,
		setFeaturesValue,
		setStatsValue,
		editDetails,
		request
	} = useProductInfo(intId)

	const isProductExist = useState(intId != 0)[0]

	useEffect(() => {
		console.log('ProductForm component mount')
	}, [])

	const formSubmit = async () => {
		if (isProductExist) await request.updateProductInfo()
		else await request.createProductInfo()
	}
	const FilePicker = ({ position }: { position: number }) => {
		return (
			<input
				type="file"
				id="fileInput"
				accept=".jpg"
				className="my-2 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-black file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white file:duration-300 file:ease-in-out hover:file:bg-fuchsia-600"
				onChange={event => {
					setImageToPos(event.target.files?.[0], position)
				}}
			/>
		)
	}

	return (
		<div className="flex h-[90vh] items-center justify-center">
			<div className="h-160 w-80 overflow-y-auto bg-fuchsia-50">
				<img
					src={
						images[0]
							? URL.createObjectURL(images[0]!)
							: isImagesExist[0]
								? productInfo.product.imageSrc
								: NO_PHOTO_YET
					}
					alt="Selected image"
					className="h-72 w-full object-cover"
				/>
				<form
					className="h-64 p-5"
					encType="multipart/form-data"
					method="post"
					onSubmit={event => event.preventDefault()}
				>
					<h2 className="text-xl font-semibold">
						{isProductExist ? 'Оновити товар' : 'Додати товар'}
					</h2>
					<FilePicker position={0} />

					<div className="flex flex-wrap justify-between">
						<input
							className="my-2 w-48"
							placeholder="назва"
							type="text"
							onChange={event => {
								setProductValues.setName(event.target.value)
							}}
							value={productInfo.product.name}
						/>
						<input
							className="my-2 w-16"
							placeholder="кількість"
							type="number"
							onChange={event => {
								setProductValues.setCount(parseInt(event.target.value))
							}}
							value={productInfo.product.count}
						/>

						<input
							className="my-2 w-32"
							placeholder="стара ціна"
							type="number"
							onChange={event => {
								setProductValues.setOldPrice(parseInt(event.target.value))
							}}
							value={productInfo.product.oldPrice}
						/>

						<input
							className="my-2 w-32"
							placeholder="нова ціна"
							type="number"
							onChange={event => {
								setProductValues.setNewPrice(parseInt(event.target.value))
							}}
							value={productInfo.product.newPrice}
						/>
					</div>
					<textarea
						className="my-2 h-20 w-full"
						placeholder="опис"
						onChange={event => {
							setProductValues.setDescription(event.target.value)
						}}
						value={productInfo.product.description}
					/>
					{isProductExist && (
						<>
							<div className="my-2">
								<div className="flex justify-between">
									<h2 className="my-auto text-xl font-semibold">
										{productInfo.details.features.length != 0
											? 'Оновити cекції'
											: 'Додати cекції'}
									</h2>
									<BorderedBtn handleClick={editDetails.addFeature}>
										+
									</BorderedBtn>
								</div>

								{productInfo.details.features.map(
									(feature: IFeature, index: number) => {
										return (
											<div key={index} className="my-2">
												<div className="my-2 flex justify-between">
													<h4 className="font-medium">Ceкція {index + 1}</h4>
													<BorderedBtn handleClick={editDetails.deleteFeature}>
														-
													</BorderedBtn>
												</div>
												<img
													src={
														images[index + 1]
															? URL.createObjectURL(images[index + 1]!)
															: isImagesExist[index + 1]
																? feature.imageSrc
																: '/NO_PHOTO_YET.png'
													}
													alt="Selected image"
													className="h-72 w-full object-cover"
												/>
												<FilePicker position={index + 1} />
												<input
													className="my-2 w-48"
													placeholder="назва"
													type="text"
													onChange={event =>
														setFeaturesValue.setFeatureTitle(
															event.target.value,
															index
														)
													}
													value={feature.title}
												/>
												<textarea
													className="my-2 h-20 w-full"
													placeholder="опис"
													onChange={event =>
														setFeaturesValue.setFeatureDescription(
															event.target.value,
															index
														)
													}
													value={feature.description}
												/>
											</div>
										)
									}
								)}
							</div>
							<div className="my-2">
								<div className="flex justify-between">
									<h2 className="my-auto text-lg font-semibold">
										{productInfo.details.stats.length != 0
											? 'Оновити характеристики'
											: 'Додати характеристики'}
									</h2>
									<BorderedBtn handleClick={editDetails.addProperty}>
										+
									</BorderedBtn>
								</div>

								{productInfo.details.stats.map(
									(property: IProperty, index: number) => {
										return (
											<div key={index} className="my-2">
												<div className="my-2 flex justify-between">
													<h4 className="font-medium">
														Характеристика {index + 1}
													</h4>
													<BorderedBtn handleClick={editDetails.deleteProperty}>
														-
													</BorderedBtn>
												</div>

												<input
													className="my-2 w-32"
													placeholder="назва"
													type="text"
													onChange={event =>
														setStatsValue.setPropertyName(
															event.target.value,
															index
														)
													}
													value={property.name}
												/>
												<input
													className="my-2 w-32"
													placeholder="значення"
													type="text"
													onChange={event =>
														setStatsValue.setPropertyValue(
															event.target.value,
															index
														)
													}
													value={property.value}
												/>
											</div>
										)
									}
								)}
							</div>
						</>
					)}
					<FilledBtn handleClick={formSubmit}>
						{isProductExist ? 'Оновити' : 'Додати'}
					</FilledBtn>
				</form>
			</div>
		</div>
	)
}
export default ProductForm
