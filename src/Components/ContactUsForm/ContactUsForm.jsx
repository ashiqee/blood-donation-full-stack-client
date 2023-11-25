import {
    Card,
    Input,

    Button,
    Typography,
} from "@material-tailwind/react";



const ContactUsForm = () => {
    return (
        <Card color="transparent" shadow={false}>

            <Typography color="gray" className="mt-1 font-normal">
                Nice to meet you! Enter your details to contact us.
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-1 flex flex-col gap-6">
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Your Name
                    </Typography>
                    <Input
                        size="lg"
                        placeholder="name"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Your Email
                    </Typography>
                    <Input
                        size="lg"
                        placeholder="name@mail.com"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                    />

                </div>

                <Button className="mt-6 bg-[#f34334] " fullWidth>
                    SEND
                </Button>

            </form>
        </Card>
    );
};

export default ContactUsForm;