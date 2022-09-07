import { Loader } from "./styles";

enum LoadingSize {
	SMALL = "small",
	MEDIUM = "medium",
	LARGE = "large",
}

export type LoadingProps = {
	className?: string;
	size?: `${LoadingSize}`;
};

export const Loading = ({ className, size = "medium" }: LoadingProps) => {
	const sizes: { [key in LoadingSize]: string } = {
		[LoadingSize.SMALL]: "1.6rem",
		[LoadingSize.MEDIUM]: "3.2rem",
		[LoadingSize.LARGE]: "4.8rem",
	};

	return (
		<Loader
			className={className}
      size={sizes[size]}
		/>
	);
};
