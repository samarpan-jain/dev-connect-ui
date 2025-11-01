
const InputField = ({legend, type, placeholder, IconComponent, value, handleChange, required, disabled=false, formErrors, field, ...props}) => {
  return (
    <div className="fieldset py-2 mx-auto w-[80%]">
        <legend className="fieldset-legend text-left">{legend}</legend>
        <label className="input validator w-full border border-gray-300 rounded-md">
            {IconComponent && <IconComponent />}
            <input
                type={type || "text"}
                placeholder={placeholder || `Enter your ${legend.toLowerCase()} here`}
                value={value}
                onChange={(e) => handleChange(e)}
                required = {required}
                disabled={disabled}
                {...props}
            />
        </label>
        {formErrors && formErrors[field] && <p className="validator-hint hidden">{formErrors[field]}</p>}
    </div>
  )
}

export default InputField