import empty_icon from '../../assets/icons/empty-result.svg'

const EmptyResult = () => {
  return (
    <div className="w-full h-full min-h-96 flex flex-col gap-8 items-center justify-center -bg--color-very-light-grey shadow-md bg-opacity-30 rounded-3xl">
      <p className="text-xl font-semibold">No Clothes Found</p>
      <img src={empty_icon} className="w-20" alt="empty icon" />
    </div>
  )
}

export default EmptyResult