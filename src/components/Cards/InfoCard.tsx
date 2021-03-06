const InfoCard = ({ title, value, children: icon }) => {
  return (
    <div className='min-w-0 overflow-hidden bg-white rounded-lg shadow-xs dark:bg-gray-800'>
      <div className='flex items-center p-4'>
        {icon}
        <div>
          <p className='mb-2 text-sm font-medium text-gray-600 dark:text-gray-400'>{title}</p>
          <p className='text-lg font-semibold text-gray-700 dark:text-gray-200'>{value}</p>
        </div>
      </div>
    </div>
  )
}

export default InfoCard
