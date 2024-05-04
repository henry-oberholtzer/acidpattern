import { createContext, useState, } from 'react';
import { AcidPattern303 } from '../../components/AcidPattern303';
import { GroupDiv } from '../../components/303Components';
import { PatternProvider, } from '../../hooks';

const PatternClearModalContext = createContext({
	set: (bool: boolean) => {
		bool;
	},
	get: false,
})

const PatternCreateView = (props: PatternCreateProps) => {
	const [getModal, setModal ] = useState<boolean>(false)

	return (
			<PatternProvider pattern={props.pattern}>
				<PatternClearModalContext.Provider value={{
					get: getModal,
					set: setModal,
				}}>
					<GroupDiv>
							<AcidPattern303/>
					</GroupDiv>
				</PatternClearModalContext.Provider>
			</PatternProvider>
	);
};

interface PatternCreateProps {
	pattern: Pattern;
}

export { PatternCreateView, PatternClearModalContext};
