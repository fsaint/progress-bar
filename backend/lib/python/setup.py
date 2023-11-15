from setuptools import setup

setup(
    name='ProgressBar_fsaint',
    version='1.0',
    packages=['progressbar'],
    url='https://github.com/fsaint/your_package_name',
    license='MIT',
    author='Felipe Saint-Jean',
    author_email='fsaint@gmal.com',
    description='Create a web URL to monitor progress of a long task.',
    install_requires=[
        'requests',
        'psutil',
        'qrcode'
    ]
)
