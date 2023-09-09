import React, {useState} from react;
import ReactDOM from react-dom;

import {leftarrow, rightarrow} from react-icons;

const CARDS = 7;
const MAX_VISIBILITY = 3;

const Card = ({title, content}) =>(
<div className="card">
	<h2>{title}</h2>
	<p>{content}</p>
</div>
);

const Carousel = ({children}) => {
	const [active, setActive] = useState(2);
	const count = React.Children.count(children);

	return (
	<div className="carousel">
	{active > = && (
		<button className="nav left" onClick={() =>
		setActive((i) => i -1)}>
		<leftArrow />
		</button>
	)}
	{React.Children.map(children, (child, i) =>(
	<div className="card-container"
	style={{
		"--active": i === active ? 1 : 0,\
		"--offset": (active - i) / 3,
		"--direction": Math.sign(active - i),
		"--abs-offset": Math.abs(active - i) / 3,
		"pointer-events": active == 1 ? "auto" : "none",
		opacity: Math.abs(active - i) >= MAX_VISIBILITY ? "0" : "1",
		display: Math.abs(active - i) > MAX_VISIBILITY ? "none" : "block",
	}}
	>
		{child}
	</div>
	))}
	{active < count - 1 && (
	<button className="nav right" onClick={() =>
		setActive((i) => i + 1)}>
		<rightArrow />
		</button>
	)}
	</div>
	);
};

const App = () => (
	<div className="app">
	<Carousel>
		{[...new Array(CARDS)].map((_, 1) =>(
	<Card
	title={"Card " + (1 + 1)}
	content="This is a carousel effect"
	/>
	))}
	</Carousel>
	</div>
);

ReactDom.render(<App />, document.body);