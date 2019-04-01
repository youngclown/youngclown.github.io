---
layout: post
title: "org.osgi.framework.BundleException: Exception in org.eclipse.core.resources.ResourcesPlugin.start()"
date: 2011-09-06 10:35:00 +0900
comments: true
---

```
org.osgi.framework.BundleException: Exception in org.eclipse.core.resources.ResourcesPlugin.start() of bundle org.eclipse.core.resources.
	at org.eclipse.osgi.framework.internal.core.BundleContextImpl.startActivator(BundleContextImpl.java:1028)
	at org.eclipse.osgi.framework.internal.core.BundleContextImpl.start(BundleContextImpl.java:984)
	at org.eclipse.osgi.framework.internal.core.BundleHost.startWorker(BundleHost.java:346)
	at org.eclipse.osgi.framework.internal.core.AbstractBundle.start(AbstractBundle.java:265)
	at org.eclipse.osgi.framework.util.SecureAction.start(SecureAction.java:400)
	at org.eclipse.core.runtime.internal.adaptor.EclipseLazyStarter.postFindLocalClass(EclipseLazyStarter.java:111)
	at org.eclipse.osgi.baseadaptor.loader.ClasspathManager.findLocalClass(ClasspathManager.java:427)
	at org.eclipse.osgi.internal.baseadaptor.DefaultClassLoader.findLocalClass(DefaultClassLoader.java:193)
	at org.eclipse.osgi.framework.internal.core.BundleLoader.findLocalClass(BundleLoader.java:368)
	at org.eclipse.osgi.framework.internal.core.SingleSourcePackage.loadClass(SingleSourcePackage.java:33)
	at org.eclipse.osgi.framework.internal.core.BundleLoader.findClassInternal(BundleLoader.java:441)
	at org.eclipse.osgi.framework.internal.core.BundleLoader.findClass(BundleLoader.java:397)
	at org.eclipse.osgi.framework.internal.core.BundleLoader.findClass(BundleLoader.java:385)
	at org.eclipse.osgi.internal.baseadaptor.DefaultClassLoader.loadClass(DefaultClassLoader.java:87)
	at java.lang.ClassLoader.loadClass(ClassLoader.java:251)
	at java.lang.ClassLoader.loadClassInternal(ClassLoader.java:319)
	at org.eclipse.ui.views.markers.MarkerViewHandler.<clinit>(MarkerViewHandler.java:39)
	at sun.reflect.NativeConstructorAccessorImpl.newInstance0(Native Method)
	at sun.reflect.NativeConstructorAccessorImpl.newInstance(NativeConstructorAccessorImpl.java:39)
	at sun.reflect.DelegatingConstructorAccessorImpl.newInstance(DelegatingConstructorAccessorImpl.java:27)
	at java.lang.reflect.Constructor.newInstance(Constructor.java:494)
	at java.lang.Class.newInstance0(Class.java:350)
	at java.lang.Class.newInstance(Class.java:303)
	at org.eclipse.core.internal.registry.osgi.RegistryStrategyOSGI.createExecutableExtension(RegistryStrategyOSGI.java:170)
	at org.eclipse.core.internal.registry.ExtensionRegistry.createExecutableExtension(ExtensionRegistry.java:867)
	at org.eclipse.core.internal.registry.ConfigurationElement.createExecutableExtension(ConfigurationElement.java:243)
	at org.eclipse.core.internal.registry.ConfigurationElementHandle.createExecutableExtension(ConfigurationElementHandle.java:51)
	at org.eclipse.ui.internal.handlers.HandlerProxy.loadHandler(HandlerProxy.java:335)
	at org.eclipse.ui.internal.handlers.HandlerProxy.isEnabled(HandlerProxy.java:304)
	at org.eclipse.core.commands.Command.isEnabled(Command.java:833)
	at org.eclipse.core.commands.Command.setHandler(Command.java:996)
	at org.eclipse.ui.internal.handlers.HandlerAuthority.updateCommand(HandlerAuthority.java:459)
	at org.eclipse.ui.internal.handlers.HandlerAuthority.activateHandler(HandlerAuthority.java:249)
	at org.eclipse.ui.internal.handlers.HandlerService.activateHandler(HandlerService.java:120)
	at org.eclipse.ui.internal.handlers.HandlerService.activateHandler(HandlerService.java:112)
	at org.eclipse.ui.internal.handlers.HandlerService.activateHandler(HandlerService.java:107)
	at org.eclipse.ui.internal.handlers.HandlerPersistence.readDefaultHandlersFromRegistry(HandlerPersistence.java:250)
	at org.eclipse.ui.internal.handlers.HandlerPersistence.reRead(HandlerPersistence.java:204)
	at org.eclipse.ui.internal.handlers.HandlerPersistence.read(HandlerPersistence.java:158)
	at org.eclipse.ui.internal.handlers.HandlerService.readRegistry(HandlerService.java:186)
	at org.eclipse.ui.internal.handlers.HandlerServiceFactory.create(HandlerServiceFactory.java:61)
	at org.eclipse.ui.internal.services.WorkbenchServiceRegistry.getService(WorkbenchServiceRegistry.java:102)
	at org.eclipse.ui.internal.services.ServiceLocator.getService(ServiceLocator.java:174)
	at org.eclipse.ui.internal.Workbench$43.runWithException(Workbench.java:1675)
	at org.eclipse.ui.internal.StartupThreading$StartupRunnable.run(StartupThreading.java:31)
	at org.eclipse.swt.widgets.RunnableLock.run(RunnableLock.java:35)
	at org.eclipse.swt.widgets.Synchronizer.runAsyncMessages(Synchronizer.java:133)
	at org.eclipse.swt.widgets.Display.runAsyncMessages(Display.java:3800)
	at org.eclipse.swt.widgets.Display.readAndDispatch(Display.java:3425)
	at org.eclipse.ui.internal.Workbench.runUI(Workbench.java:2293)
	at org.eclipse.ui.internal.Workbench.access$4(Workbench.java:2198)
	at org.eclipse.ui.internal.Workbench$5.run(Workbench.java:493)
	at org.eclipse.core.databinding.observable.Realm.runWithDefault(Realm.java:288)
	at org.eclipse.ui.internal.Workbench.createAndRunWorkbench(Workbench.java:488)
	at org.eclipse.ui.PlatformUI.createAndRunWorkbench(PlatformUI.java:149)
	at org.eclipse.ui.internal.ide.application.IDEApplication.start(IDEApplication.java:113)
	at org.eclipse.equinox.internal.app.EclipseAppHandle.run(EclipseAppHandle.java:193)
	at org.eclipse.core.runtime.internal.adaptor.EclipseAppLauncher.runApplication(EclipseAppLauncher.java:110)
	at org.eclipse.core.runtime.internal.adaptor.EclipseAppLauncher.start(EclipseAppLauncher.java:79)
	at org.eclipse.core.runtime.adaptor.EclipseStarter.run(EclipseStarter.java:382)
	at org.eclipse.core.runtime.adaptor.EclipseStarter.run(EclipseStarter.java:179)
	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
	at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:39)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:25)
	at java.lang.reflect.Method.invoke(Method.java:585)
	at org.eclipse.equinox.launcher.Main.invokeFramework(Main.java:549)
	at org.eclipse.equinox.launcher.Main.basicRun(Main.java:504)
	at org.eclipse.equinox.launcher.Main.run(Main.java:1236)
```
1. eclipse.exe -clean 으로 실행
이클립스를 사용하여 개발할때 파일 저장하거나 기타 다른 동작을 할때 크래쉬 오류가 계속 나온다면 clean 이란 명령어를 사용하라고 해서, 위의 오류가 났을때도 해봤는데 해결되지 않았다.
해당 방법을 사용할때는 이클립스 설치 폴더의 eclipse.ini 안에 -clean 이라고 넣고 실행하면 된다.

2. 그대로 안되면 참조 주소
모든 .metadata 삭제

-----
# 참조 
-----

* [metadata 데이터 폴더를 전부 삭제해버리기](http://blog.outsider.ne.kr/636)
