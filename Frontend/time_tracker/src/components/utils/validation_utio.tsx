function validate_field_length(value: string){
    if(value.length < 3){
        alert(`input value ${value} must be at least 10 symbols length`)
        return false;
    }
    return true;
}

export default validate_field_length;