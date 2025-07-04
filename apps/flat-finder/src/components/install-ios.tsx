export function IOSInstall() {
  return (
    <div className="space-y-4 py-6">
      <div className="px-4">
        <h1 className="text-2xl font-bold">Install Flat Finder</h1>
        <p className="text-muted-foreground">
          Here are the instructions to install Flat Finder on your iOS device.
        </p>
      </div>
      <div className="space-y-8">
        {instructions.map((instruction) => (
          <div key={instruction.step} className="space-y-4 bg-secondary p-4">
            <p className="text-lg">
              <span className="font-bold">Step {instruction.step}: </span>
              {instruction.title}
            </p>
            <img src={instruction.image} alt={instruction.title} />
          </div>
        ))}
      </div>
    </div>
  )
}

const instructions = [
  {
    step: 1,
    title: 'Click the Share button at the bottom.',
    image: '/assets/install-instructions/ios/share.png',
  },
  {
    step: 2,
    title: 'Click the Add to Home Screen button.',
    image: '/assets/install-instructions/ios/add-to-homescreen.png',
  },
  {
    step: 3,
    title: 'Click the Add button.',
    image: '/assets/install-instructions/ios/add.png',
  },
  {
    step: 4,
    title: 'Click the App icon to open the app.',
    image: '/assets/install-instructions/ios/app.png',
  },
]
