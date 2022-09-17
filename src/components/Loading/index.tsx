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
		[LoadingSize.SMALL]: "16px",
		[LoadingSize.MEDIUM]: "32px",
		[LoadingSize.LARGE]: "48px",
	};

	return (
		<Loader
			className={className}
      size={sizes[size]}
		/>
	);
};
