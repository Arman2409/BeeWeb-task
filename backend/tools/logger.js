import { createLogger , transports, format} from "winston";

const customFormat = format.combine(format.printf((info) => {
    if (info.level == 'error') {
        return `!!! error !!!    ${info.message}`;
    } else if(info.level == "info"){
        return `*** info ***   ${info.message}`;
    } else if(info.level == "silly") {
        return `||| route |||  ${info.message}`;
    }
}
));

const logger = createLogger({
    format:customFormat,
    transports:[
        new transports.Console({level:"silly"}),
        new transports.File({filename:"app.log"})
    ]
})

export default logger;