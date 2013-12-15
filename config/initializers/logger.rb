formatter = Proc.new{|severity, time, progname, msg|
  formatted_severity = sprintf("%-5s",severity.to_s)
  formatted_time = time.strftime("%Y-%m-%d %H:%M:%S")
  "[#{formatted_severity} #{formatted_time} #{$$}] #{msg.to_s.strip}\n"
}

MultiLogger.add_logger('api_errors', formatter:formatter)