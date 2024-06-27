interface TemplateProps {
    loading?: boolean
    children: React.ReactNode
}

interface RenderIfProps {
    condition: boolean
    children: React.ReactNode
}

interface MainSection {
    children: React.ReactNode
}

export const Template: React.FC<TemplateProps> = ({ children }: TemplateProps) => {
    return (
        <div>
            <Header />
            <MainSection>
                {children}
            </MainSection>
            <Footer />
        </div>
    )
}

export const Footer: React.FC = () => {
    return (
        <footer className="bg-blue-600 text-white py-4 ">
            <div className="container mx-auto text-center">
                Desenvolvido por André Torres
            </div>
        </footer>
    )
}

export const Header: React.FC = () => {
    return (
        <header className="bg-blue-600 text-white py-4 px-4">
            <div className="flex justify between items-center">
                <div className="container flex justify between ">
                    <p className="text-3xl">BancoTS</p>
                </div>
                <RenderIf condition={true}>
                    <div className="w-64 py-3 px-6 text-md">
                        <span className="relative text-xl">Bem vindo ???</span>
                        <span className="ml-4 text-xl">
                            <a href="#">Sair</a>
                        </span>
                    </div>
                </RenderIf>
            </div>
        </header>
    )
}

export const RenderIf: React.FC<RenderIfProps> = ({ condition, children }: RenderIfProps) => {
    if (condition) {
        return children
    }

    return false
}

export const MainSection: React.FC<MainSection> = ({ children }: MainSection) => {
    return (
        <div className="flex items-center justify-center my-20">
            {children}
        </div>
    )
}