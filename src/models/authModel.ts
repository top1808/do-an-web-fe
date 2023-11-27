interface FormLogin {
	username?: string;
	password?: string;
	remember?: boolean;
}

interface FormRegister extends FormLogin {
	email?: string;
}

export type { FormLogin, FormRegister };
