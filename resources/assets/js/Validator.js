export default class Validator {
    static validate(compiled) {
        
        var hasErrors = !compiled.map(data => {
            return Object.keys(data).map(key => {
                return data[key] != null && data[key] != "";
            }).every(item => { return item; })
        }).every(item => { return item; });
        return {
            "hasErrors": hasErrors
        }
    }   
}