const GenderCheckbox = ({onCheckBoxChange, selectedGender}) => {
	return (
		<div className='flex gap-4 items-center'>
			<div className='form-control'>
				<label className='label gap-2 cursor-pointer flex items-center'>
					<span className='label-text'>Male</span>
					<input type='checkbox' className='checkbox border-slate-900' checked={selectedGender === 'male'}  
						onChange={()=>{onCheckBoxChange('male')}} />
				</label>
			</div>
			<div className='form-control'>
				<label className='label gap-2 cursor-pointer flex items-center'>
					<span className='label-text'>Female</span>
					<input type='checkbox' className='checkbox border-slate-900' checked={selectedGender === 'female'}
						onChange={()=>{onCheckBoxChange('female')}}/>
				</label>
			</div>
		</div> 
	);
};
export default GenderCheckbox;