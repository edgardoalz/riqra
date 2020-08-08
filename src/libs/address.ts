import os from 'os'

const ifaces = os.networkInterfaces()

const found: os.NetworkInterfaceInfo | undefined = Object.keys(ifaces)
  .map(key => ifaces[key])
  .map(iface => iface.find(v => !v.internal))
  .find(i => !!i)

const ip: string = found && found.address ? found.address : '127.0.0.1'

export default ip
