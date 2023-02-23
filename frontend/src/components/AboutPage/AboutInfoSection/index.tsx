/**
 * Component containing information about the application
 */

export const AboutInfoSection = () => {
    return (
        <div className="flex flex-row flex-wrap justify-start items-center px-32 max-sm:px-8 py-8">
            <h2 className="text-2xl max-sm:text-xl font-bold my-4 text-neutral-30">
                Welcome to the Aalto AI-assisted game content creation tool
            </h2>
            <p className="text-xl max-sm:text-lg leading-relaxed mb-4">
                Generative AI is the future in efficient game asset creation.
                Modern text AI has the potential to automate the creation of
                flavour texts, character backstories, item descriptions and much
                more. However, while there are plenty of generative AI solutions
                on the market, many of these pre-existing tools are repetitive
                to use, or require complicated prompting to get effective
                results.
            </p>
            <p className="text-xl max-sm:text-lg leading-relaxed">
                This tool is designed to make using generative AI{' '}
                <strong>easier</strong>, <strong>more productive</strong> and{' '}
                <strong>organized</strong>. With structured prompting that can
                smartly cross reference multiple prompts, it is possible to
                achieve more consistent results for your game world.
            </p>
        </div>
    );
};
