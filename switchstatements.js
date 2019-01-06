let timeAdder = (value1, label1, value2, label2) => {

    let checkValues = () => {

        let typeOfValue1 = typeof value1;
        let typeOfValue2 = typeof value2;

        if ( typeOfValue1 !== "number" || typeOfValue2 !== "number"   ) {
            return false;
        } else if ((parseInt(value1) < 0 || parseInt(value2) < 0)) {
            return false
        } else {
            return true;
        }
    }

    let checkLabels = () => {
        let labels = ["seconds", "minutes", "hours", "days", "second", "minute", "hour", "day"];
        let label1Valid = "";
        let label2Valid = "";

        //We check label1
        for (let i = 0; i < labels.length; i++) {
            
            if (label1 === labels[i]) {
                label1Valid = true;
                break;
            } else {
                if (i === labels.length-1) {
                    label1Valid = false;
                }
            }
            
        }

        //We check label2
        for (let i = 0; i < labels.length; i++) {
            
            if (label2 === labels[i]) {
                label2Valid = true;
                break;
            } else {
                if (i === labels.length-1) {
                    label1Valid = false;
                }
            }
            
        }

        //Final result for checking labels
        if ( label1Valid === true &&  label2Valid === true) {
            return true;
        } else {
            return false;
        }

    }

    let checkValuesLabelsCombination = () => {
        
        let value1Label1Valid = "";
        let value2Label2Valid = "";

        //We check value1 label1 combinations
        switch (label1) {
            case "second":
            case "minute":
            case "hour":
            case "day":
                if (value1 !== 1) {
                    value1Label1Valid = false;
                } else {
                    value1Label1Valid = true;
                  }
                break;
        
            default:
                value1Label1Valid = true;
                break;
        }

        switch (value1) {
            case 1:
                switch (label1) {
                    case "second":
                    case "minute":
                    case "hour":
                    case "day":
                    value1Label1Valid = true;
                        break;
                
                    default:
                    value1Label1Valid = false;
                        break;
                }
                break;
        
            default:
                break;
        }

         //We check value2 label2 combinations
        switch (label2) {
            case "second":
            case "minute":
            case "hour":
            case "day":
                if (value2 !== 1) {
                    value2Label2Valid = false;
                } else {
                    value2Label2Valid = true;
                  }
                break;
        
            default:
                value2Label2Valid = true;
                break;
        }

        switch (value2) {
            case 1:
                switch (label2) {
                    case "second":
                    case "minute":
                    case "hour":
                    case "day":
                    value2Label2Valid = true;
                        break;
                
                    default:
                    value2Label2Valid = false;
                        break;
                }
                break;
        
            default:
                break;
        }

        if ( value1Label1Valid === true && value2Label2Valid === true ) {
             return true;
            
        } else {
            return false;
        }

    }

    if (checkValues() === false || checkLabels() ===false || checkValuesLabelsCombination() === false) {
        return false;
    } else {
    //Lets add two time values
        
        //Count seconds in first time vale
        let secondsInValue1 = () => {
            let seconds = "";
            switch (label1) {
                case "second":
                    seconds = 1;
                    return seconds;
                case "minute":
                    seconds = 60;
                    return seconds;
                case "hour":
                    seconds = 60*60;
                    return seconds;
                case "day":
                    seconds = (24*60)*60;
                    return seconds;
                case "seconds":
                    seconds = value1;
                    return seconds;
                case "minutes":
                    seconds = value1*60;
                    return seconds;
                case "hours":
                    seconds = (value1*60)*60;
                    return seconds;
                case "days":
                    seconds = (value1*24)*60*60;
                    return seconds;
                default:
                    break;
            }
        }

          //Count seconds in first time vale
          let secondsInValue2 = () => {
            let seconds = "";
            switch (label2) {
                case "second":
                    seconds = 1;
                    return seconds;
                case "minute":
                    seconds = 60;
                    return seconds;
                case "hour":
                    seconds = 60*60;
                    return seconds;
                case "day":
                    seconds = (24*60)*60;
                    return seconds;
                case "seconds":
                    seconds = value2;
                    return seconds;
                case "minutes":
                    seconds = value2*60;
                    return seconds;
                case "hours":
                    seconds = (value2*60)*60;
                    return seconds;
                case "days":
                    seconds = (value2*24)*60*60;
                    return seconds;
                default:
                    break;
            }
        }

        //Add seconds and make return
        let result = [];
        let seconds = secondsInValue1() + secondsInValue2();

        let makeResult = () => {
        
        result[0] = seconds;
        result[1] = "seconds";
        switch (seconds) {
            case 1:
                result[0] = seconds;
                result[1] = "second";
                return result;
            case 60:
                result[0] = 1;
                result[1] = "minute";
                return result;
            case 3600:
                result[0] = 1;
                result[1] = "hour";
                return result;
            case 86400:
                result[0] = 1;
                result[1] = "day";
                return result;
        
            default:
                break;
        }

        switch (label1) {
            case "seconds":
                switch (label2) {
                    case "minutes":
                        if ( (seconds % 60) === 0) {
                            result[0] = seconds/60;
                            result[1] = "minutes";
                            return result;
                        }   
                        break;
                
                    default:
                        break;
                }
                break;
            case "minutes":
                switch (label2) {
                    case "minutes":
                    result[0] = seconds/60;
                    result[1] = "minutes";
                    return result;
                    case "seconds" :
                        if ( (seconds % 60) === 0) {
                            result[0] = seconds/60;
                            result[1] = "minutes";
                            return result;
                        }
                        break;
                    default:
                        break;
                }
                break;
            case "hours":
                switch (label2) {
                    case "hours":
                        result[0] = seconds/3600;
                        result[1] = "hours";
                        return result;
                    case "minutes":
                        if ( (seconds % 3600) === 0) {
                            result[0] = seconds/3600;
                            result[1] = "hours";
                            return result;
                        } else {
                            result[0] = seconds/60;
                            result[1] = "minutes";
                            return result; 
                        }


                        break;
                    default:
                        break;
                }
                break;
            case "days":
                switch (label2) {
                    case "days":
                        result[0] = seconds/86400;
                        result[1] = "days";
                        return result;
                    case "hours":
                        if ( (seconds % 86400) === 0) {
                            result[0] = seconds/86400;
                            result[1] = "days";
                            return result;
                        } else {
                            result[0] = seconds/3600;
                            result[1] = "hours";
                            return result; 
                        }
                
                    default:
                        break;
                }
                break;
        
            default:
                break;
        }


        return result;

        }

        return makeResult();

        
    }


}