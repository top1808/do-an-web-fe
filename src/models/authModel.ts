interface FormLogin {
	username?: string;
	password?: string;
}

interface FormRegister extends FormLogin {
	email?: string;
}

export type { FormLogin, FormRegister };
