type CallbackFunction = () => void;

interface ContentStructure {
    page: string
    template: string,
    actions?: Map<string, CallbackFunction>,
    callbacks?: Map<string, CallbackFunction>
}

export default ContentStructure;